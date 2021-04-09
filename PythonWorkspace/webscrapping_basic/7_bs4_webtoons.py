import requests
from bs4 import BeautifulSoup

url = "https://comic.naver.com/webtoon/weekday.nhn"
res = requests.get(url)
res.raise_for_status()

soup = BeautifulSoup(res.text, "lxml")

# 네이버 웹툰 전체목록 가져오기
cartoons = soup.find_all("a",attrs={"class":"title"})
# 클래스 속시ㅏㅇ이 타이틀인 모든 ㅔㅇ이 엘리먼트를 반환
for cartoon in cartoons :
    print(cartoon.get_text())

