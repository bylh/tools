FROM nginx
RUN mkdir /usr/share/nginx/customer
RUN mkdir /usr/share/nginx/customer/dist
# RUN rm -rf /etc/nginx/nginx.conf
# COPY ./nginx.conf /etc/nginx/nginx.conf
ADD ./bylh_tools.conf /etc/nginx/conf.d
COPY ./dist /usr/share/nginx/customer/dist
EXPOSE 8889
#  本地
## 生成镜像
### sudo docker image build -t bylh_tools .
## 运行镜像
### sudo docker run -d --name=tools1 -p 8889:8889 bylh_tools
##  sudo docker run -d --name=tools1 -p 8889:8889 [imgageID] // 远程拉下来的直接用imageID
### docker logs tools1  (name or containerID)

#  上传镜像
## 登录
### docker login
## 打标签
### docker tag [imgageId] bylh/bylh_tools:v1.0      (用户名/imgage名称:标签)
### bylh/bylh_tools:v1.0
### docker push bylh/bylh_tools:v1.0  (push后面的是tag名称)

### 从其他服务器拉取
### docker pull bylh/bylh_tools:v1.0
### sudo docker run -d --name=tools1 -p 8889:8889 [imgageID] // 远程拉下来的直接用imageID


### 同名的会直接更新
