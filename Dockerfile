FROM node:20.11.0

COPY . /root/trading-pnl-calculator
WORKDIR /root/trading-pnl-calculator
RUN npm i 

EXPOSE 3000