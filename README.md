<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17OR-mjTYCAmsBeKnircpYRqnmtX5f0kz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

이 프로젝트는 GitHub Pages로 자동 배포됩니다.

### 배포 설정 방법:

1. **GitHub Secrets 설정**
   - GitHub 저장소로 이동: https://github.com/toolofuture/quantumart
   - Settings > Secrets and variables > Actions로 이동
   - "New repository secret" 클릭
   - Name: `GEMINI_API_KEY`
   - Value: 본인의 Gemini API 키 입력
   - "Add secret" 클릭

2. **GitHub Pages 활성화**
   - Settings > Pages로 이동
   - Source를 "GitHub Actions"로 선택
   - 저장

3. **배포**
   - `main` 브랜치에 푸시하면 자동으로 배포됩니다
   - Actions 탭에서 배포 진행 상황을 확인할 수 있습니다
   - 배포 완료 후 `https://toolofuture.github.io/quantumart/` 에서 확인 가능합니다

### 수동 배포:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```
