import re
# abcd, book, desk
# ca?e
# care, cafe, case, cave
# caae, cabe, cace, cade ...

p = re.compile("ca.e") 
# . 하나의 문자   > care  cafe case   caffee X
# ^ (^de)문자열의 시작 > desk, destination, fade X
# $ (se$) : 문자열의 끝 > case base |face X

def print_match(m):
    if m:
        print("m.group() :",m.group()) # 일치하는 문자열 반환
        print("m.string() :",m.string) #입력받은 문자열
        print("m.start() : ",m.start()) #일치하는 문자열의 시작 index
        print("m.end():", m.end())
        print("m.span():",m.span()) #일치하는 문자열의 시작/끝 인덱스
    else:
        print("매칭되지 않았습니다")

# m = p.match("careless") # 주어진 문자열의 처음부터 일치하는지 확인 match
# print_match(m)

# m = p.search("good care") # 주어진 문자열 중에 일치하는게 있는지 확인
# print_match(m)

# lst = p.findall("good care cafe") #일치하는 모든것을 리스트형태로 반환
# print(lst)

# 1. p = re.compile("우너하는 형태")
# 2. m = p.match("비교할 문자열")
# 3. m = p.search(비교할문자열) # 주어진 문자열중에 일치
# 4. lst = p.finall(빅ㅎㅁㅈㅇ) 일치하는 모든것을들을 리스트형태로 반환

# 원하는 형태 : 정규식
# . 하나의 문자
# ^ 으로 시작
# $ 이 문자로 끝나는
