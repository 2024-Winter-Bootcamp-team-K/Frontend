# Step 1: Build Stage
FROM node:20-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 소스 파일 복사 및 빌드
COPY . .
RUN yarn build

# Step 2: Production Stage
FROM node:20-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일 복사
COPY --from=build /app/dist ./dist

# 의존성 설치 (필요한 경우 프로덕션 의존성만 설치)
COPY package.json yarn.lock ./
RUN yarn install --production

# 애플리케이션 실행
EXPOSE 3000
CMD ["yarn", "preview"]