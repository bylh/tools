import * as Diff from 'diff'

// 过滤word标签
function removeWordXml(text) {
    let html = text
    html = html.replace(/<\/?spanyes[^>]*>/gi, '')
    html = html.replace(/<(\w[^>]*) {2}lang=([^|>]*)([^>]*)/gi, '<$1$3')
    html = html.replace(/<\\?\?xml[^>]*>/gi, '')
    html = html.replace(/<\/?\w+:[^>]*>/gi, '')
    html = html.replace(/\n(\n)*( )*(\n)*\n/gi, '\n')
    html = html.replace(/<(meta|script|link|style).+?>/igm, '')
    html = html.replace(/<\/?font[^>]*>/gi, '')
    html = html.replace(/<!--[\w\W\r\n]*?-->/gmi, '')
    return html
}

function diffHtml(left, right, config = {}, callback) {
    // 如果left/right均为空，直接返回
    let _config = {
        leftColor: 'red',
        rightColor: '#18bf18',
        commonColor: '#333',
        // clear属性为false时无差异内容不会添加文本颜色,（即不会包裹带color属性的span标签），但是可能会有自带样式与差异文本的颜色重复，影响对比效果
        clear: true, // 是否清除文本颜色，统一为commonColor
        diffType: '中文',
        emptyTip: ''
    }
    _config = Object.assign(_config, config)
    const convertToString = (value) => {
        if (Object.prototype.toString.call(value) === '[object String]') {
            return value
        }
        if (Object.prototype.toString.call(value) === '[object Number]' && !isNaN(value)) {
            return value.toString()
        }
        return ''
    }
    left = convertToString(left)
    right = convertToString(right)

    if (!left.length && !right.length) {
        return {
            left: _config.emptyTip,
            right: _config.emptyTip
        }
    }
    if (!_config.clear) {
        // 如果left为空,right不为空, 并且公共文本节点需要统一颜色
        if (!left.length && right.length) {
            return {
                left: _config.emptyTip,
                right: `<span style="color: ${_config.rightColor};">${right}</span>`
            }
        }
        // 如果left不为空，right为空
        if (left.length && !right.length) {
            return {
                left: `<span style="color: ${_config.leftColor};">${left}</span>`,
                right: _config.emptyTip
            }
        }
    }

    // 过滤掉从word中粘贴带过来的标签
    left = removeWordXml(left)
    right = removeWordXml(right)
    // unicode码转换为中文，防止前后对比卡死;
    left = unescape(left.replace(/&#x([0-9a-zA-F]{4});/g, '%u$1'))
    right = unescape(right.replace(/&#x([0-9a-zA-F]{4});/g, '%u$1'))

    /* ---------------------------------- 开始处理数学公式 ------------------------------- */
    // 将文本中的数学公式用template模板来表示，这样可以保证节点占位，但是不展示
    left = left.replace(/\${[^\$]*}\$/g, function (a) {
        return `<template id="kb-math">${a}</template>`
    })
    right = right.replace(/\${[^\$]*}\$/g, function (a) {
        return `<template id="kb-math">${a}</template>`
    })
    /* ---------------------------------- 结束处理数学公式 ------------------------------- */

    // 根据左右html创建dom树
    const leftFrag = document.createRange().createContextualFragment(left)
    const rightFrag = document.createRange().createContextualFragment(right)
    // map结构保存左右dom树的遍历节点，方便后续处理
    const leftNodeMap = new Map() // 保存左侧必要的节点
    const rightNodeMap = new Map() // 保存右侧必要的节点
    // 递归遍历dom树，保存节点，返回创建后的纯文本内容
    const recNodes = (node, startIndex, nodeMap) => {
        let str = ''
        node.childNodes.forEach((item, index) => {
            item.node_id = (item.parentNode.node_id || 'frag') + '-' + index + '.' + item.nodeName
            let text = item.data
            if (text) {
                text = String.fromCharCode(160) + text.replace(/ /g, String.fromCharCode(160))
            }
            nodeMap.set(item.node_id, {
                node_id: item.node_id,
                text,
                type: item.nodeName,
                node: item, // 保存原始节点
                colorText: item.nodeName === '#text' ? '' : null
            })
            startIndex++
            if (item.childNodes.length === 0) {
                if (item.nodeName === '#text') {// 文本节点
                    str +=  text
                }
            } else {
                str += recNodes(item, startIndex, nodeMap)
            }
        })
        return str
    }
    left = recNodes(leftFrag, 0, leftNodeMap)
    right = recNodes(rightFrag, 0, rightNodeMap)
    let _left = '', _right = ''
    let diff = []
    if (_config.diffType === '英文') {
        diff = Diff.diffWordsWithSpace(left, right) // 使用diffWords空格可能会被合并
    } else {
        diff = Diff.diffChars(left, right)
    }
    // 遍历text节点，根据diff数组为文本添加对比颜色，并返回当前的进度（数组索引，和字符串索引），方便下次循环直接定位
    const addColor = (arr, index, textIndex, len, color, clear = true) => {
        if (!arr.length) {
            return
        }
        while (len > 0) {
            if (textIndex === 0) { // 保留的空格，单词对比确保所有的text节点都隔开
                textIndex ++
                len--
            }
            const renderLen = Math.min(arr[index].text.length - textIndex, len) // 本次循环渲染的长度
            const text = arr[index].text.substr(textIndex, renderLen)
            arr[index].colorText += clear ? `<span style="color: ${color};">${text}</span>` : text
            len = len - renderLen // 剩余的长度，
            if (len > 0) {
                index++
                textIndex = 0
            } else {
                textIndex += renderLen
            }
        }
        return {
            index,
            textIndex
        }
    }
    let leftPos = {
        index: 0,
        textIndex: 0
    }
    let rightPos = {
        index: 0,
        textIndex: 0
    }
    const rightTextNodes = [...rightNodeMap.values()].filter((item => item.type === '#text')) // 左侧的纯文本节点
    const leftTextNodes = [...leftNodeMap.values()].filter((item => item.type === '#text')) // 右侧的纯文本节点
    diff.forEach((part) => {
        if (part.added) {
            rightPos = addColor(rightTextNodes, rightPos.index, rightPos.textIndex, part.value.length, _config.rightColor)
        } else if (part.removed) {
            leftPos = addColor(leftTextNodes, leftPos.index, leftPos.textIndex, part.value.length, _config.leftColor)
        } else {
            leftPos = addColor(leftTextNodes, leftPos.index, leftPos.textIndex, part.value.length, _config.commonColor, _config.clear)
            rightPos = addColor(rightTextNodes, rightPos.index, rightPos.textIndex, part.value.length, _config.commonColor, _config.clear)
        }
    })
    rightTextNodes.forEach((item) => {
        const colorText = item.colorText
        item.node.parentNode.replaceChild(document.createRange().createContextualFragment(colorText), item.node)
    })
    leftTextNodes.forEach((item) => {
        const colorText = item.colorText
        item.node.parentNode.replaceChild(document.createRange().createContextualFragment(colorText), item.node)
    })
    // 找出左右的图片节点进行对比
    const leftImgNodes = [...leftNodeMap.values()].filter((item => item.type === 'IMG'))
    const rightImgNodes = [...rightNodeMap.values()].filter((item => item.type === 'IMG'))
    const diffImgArr = Diff.diffArrays(leftImgNodes.map(item => item.node.src), rightImgNodes.map(item => item.node.src))
    let rightImgIndex = 0, leftImgIndex = 0
    diffImgArr.forEach((part) => {
        if (part.added) {
            part.value.forEach(() => {
                rightImgNodes[rightImgIndex].node.style.border = `1px solid ${_config.rightColor}`
                rightImgIndex++
            })
        } else if (part.removed) {
            part.value.forEach(() => {
                leftImgNodes[leftImgIndex].node.style.border = `1px solid ${_config.leftColor}`
                leftImgIndex++
            })
        } else {
            part.value.forEach(() => {
                // leftImgNodes[leftImgIndex].node.style.border = `1px solid ${_config.commonColor}`;
                // rightImgNodes[rightImgIndex].node.style.border = `1px solid ${_config.commonColor}`;
                leftImgIndex++
                rightImgIndex++
            })
        }
    })
    // 左右公式节点进行对比，替换
    const leftMathNodes = [...leftNodeMap.values()].filter((item => item.type === 'TEMPLATE' && item.node.id === 'kb-math'))
    const rightMathNodes = [...rightNodeMap.values()].filter((item => item.type === 'TEMPLATE' && item.node.id === 'kb-math'))
    const diffMathArr = Diff.diffArrays(leftMathNodes.map(item => item.node.innerHTML), rightMathNodes.map(item => item.node.innerHTML))
    let rightMathIndex = 0, leftMathIndex = 0
    // 恢复公式并添加对比颜色
    diffMathArr.forEach((part) => {
        if (part.added) {
            part.value.forEach((text => {
                const rightMathFrag = document.createRange().createContextualFragment(`<span style="color: ${_config.rightColor}">${text}</span>`)
                rightMathNodes[rightMathIndex].node.parentNode.replaceChild(rightMathFrag, rightMathNodes[rightMathIndex].node)
                rightMathIndex++
            }))
        } else if (part.removed) {
            part.value.forEach((text) => {
                const leftMathFrag = document.createRange().createContextualFragment(`<span style="color: ${_config.leftColor}">${text}</span>`)
                leftMathNodes[leftMathIndex].node.parentNode.replaceChild(leftMathFrag, leftMathNodes[leftMathIndex].node)
                leftMathIndex++
            })
        } else {
            part.value.forEach((text) => {
                const leftMathFrag = document.createRange()
                    .createContextualFragment(_config.clear ? `<span style="color: ${_config.commonColor}">${text}</span>` : text)
                leftMathNodes[leftMathIndex].node.parentNode.replaceChild(leftMathFrag, leftMathNodes[leftMathIndex].node)
                leftMathIndex++
                const rightMathFrag = document.createRange()
                    .createContextualFragment(_config.clear ? `<span style="color: ${_config.commonColor}">${text}</span>` : text)
                rightMathNodes[rightMathIndex].node.parentNode.replaceChild(rightMathFrag, rightMathNodes[rightMathIndex].node)
                rightMathIndex++
            })

        }
    })
    _left = [...leftFrag.childNodes].map((item: any) => item.outerHTML || item.data).join('')
    _right = [...rightFrag.childNodes].map((item: any) => item.outerHTML || item.data).join('')

    // 对比完后回调
    callback && callback({left: _left, right: _right})
    
    // 返回对比后的结果，left, right
    return {
        left: _left || _config.emptyTip,
        right: _right || _config.emptyTip
    }
}

export default diffHtml
