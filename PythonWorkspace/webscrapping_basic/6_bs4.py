import requests
from bs4 import BeautifulSoup

url = "https://comic.naver.com/webtoon/weekday.nhn"
res = requests.get(url)
res.raise_for_status()

soup = BeautifulSoup(res.text, "lxml")
# print(soup.title)
# print(soup.title.get_text())

# print(soup.a) #처음발견되는 a 엘리먼트 ㅊ풀쳑

# print(soup.a.attrs) #속성정보 출력
print(soup.a["href"]) # a엘리먼트의 href 속성 출력

# print(soup.find("a", attrs = {"class":"Nbtn_upload"})) # zm,ffotmrk클래스가 a인 엘리먼트
# print(soup.find( attrs = {"class":"Nbtn_upload"})) # 클래스가 엔버ㅏ튼인 어떤 에ㅐㄹ리먼틀르 찾아줘

 #print(soup.find("li", attrs={"class":"rank01"}))

#rank1 = soup.find("li", attrs={"class":"rank01"})

# print(rank1.a.get_text())
# print(rank1.next_sibling)
# rank2 = rank1.next_sibling.next_sibling
# rank3 = rank2.next_sibling.next_sibling
# print(rank3.a.get_text())

# rank2 = rank3.previous_sibling.previous_sibling
# print(rank2.a.get_text())

#print(rank1.parent)

# rank2 = rank1.find_next_sibling("li")
# print(rank2.a.get_text())
# rank3 = rank2.find_next_sibling("li")
# print(rank3.a.get_text())

# rank2 = rank3.find_previous_sibling("li")
# print(rank2.a.get_text())

#print(rank1.find_next_siblings("li"))

webtoon = soup.find("a",text= "참교육-8화")
print(webtoon)