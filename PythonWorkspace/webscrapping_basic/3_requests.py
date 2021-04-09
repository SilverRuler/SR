import requests
res = requests.get("http://google.com")
#res = requests.get("http://nadocoding.tistory.com")
res.raise_for_status() 
print("응답코드 : ",res.status_code) #200 정상


# if res.status_code == requests.codes.ok :
#     print("정상")
# else :
#     print("오류 에러코드 ",res.status_code)

print(len(res.text))

print(res.text)

with open("mygoogle.html","w",encoding="utf8") as f:
    f.write(res.text)