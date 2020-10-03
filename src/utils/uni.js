
(async () => {
    const axios = require('axios')
    // console.log('hello')
    // const res = await axios({
    //     url: 'https://raw.githubusercontent.com/alex-kampa/Sot.rb/c1add780f7e694b745fd284ed926b49a06e13211/test_GZR/acc/GZR.full.json'
    // })
    // console.log(res.data)
    const res = {
        data: [
            {
                'address': '0x9AEcB3D2e90b416e2bE8280F678139868BE55486'
            },
            {
                'address': '0x9F40FBFf9edA6fcd560e391c06386BC9606aeDAa'
            },
            {
                'address': '0xe1f7eB9c92dc27748C3e673C35fe44E5bacb33F7'
            },
            {
                'address': '0xb79CE2630aa1255C47AF51E102BAE46772090F79'
            },
            {
                'address': '0x7675BCC39A3B4290A5059D4Ec925B5bAD1Ce7D7E'
            },
            {
                'address': '0x1cF63573ccf4c164d47aD7DD6b3856A3D4115181'
            },
            {
                'address': '0xb032929FdA068344c06390886851B58618E0d371'
            },
            {
                'address': '0x716b269cC1E16Af73eC06C11B56fF4473fFb90C2'
            },
            {
                'address': '0x5ac3b3F9eCe121588d4B4d8369fd17991e9fAA45'
            },
            {
                'address': '0x939dC05470c4a14dA675393238C6f8CEe5A175e9'
            }
        ]
    }
    const queue = []
    const errs = []
    for (const item of res.data) {
        if (item != null) {
            console.log(item.address)
            queue.push(axios({
                url: `https://gentle-frost-9e74.uniswap.workers.dev/1/${item.address}`
            }).catch(err => {
                console.log('err123', err.message)
                errs.push(err)
            }))
        }
    }
    let i = 0

    try {
        await Promise.all(queue)
    } catch (err) {
        i++
        console.log('err', i)
    }
    console.log(queue.length, errs.length)

})()