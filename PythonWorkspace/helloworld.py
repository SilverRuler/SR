# ML쪽
# print("월 : " + jumin[2:4]) #4직전까지
# print("생년월일 : "+jumin[:6])
# print("뒤 7자리:"+jumin[7:])
# print("뒤 7자리(뒤에부터):"+jumin[-7:])

# print(python.replace("Python","Java"))
# index = python.index("n")
# print(index)
# index = python.index("n",index + 1)
# print(index)
# print(python.count("n"))
# print(python.find("Java"))
# print(python.index("Java"))

# print("나는 %s색과 %s색을 좋아해요."%("파란","빨간"))
# print("나는 {age}살이며, {color}색을 좋아해요.".format(age=20,color="빨간"))
# age = 20
# color = "빨간"
# print(f"나는 {age}살이며, {color}색을 좋아해요.") #v3.6~

# subway = ["유재석","조세호","박명수"]
# print(subway.index("조세호"))
# subway.append("하하")
# print(subway)
# subway.insert(1,"정형돈")
# print(subway)
# subway.append("유재석")
# num_list.extend(mix_list)
# print(cabinet.get(5,"사용가능")) ???5번 열쇠를 사용할수잇다?
# cabinet = {"A-3":"유재석", "B-100":"김태호"}
# cabinet["C-20"] = "조세호"
# del cabinet["A-3"]

# menu = ("돈까스", "치즈까스") 튜플 변경불가
# (name,age,hobby) = ("김종국", 20, "코딩")
# 집합set 중복x, 순서x
# my_set = {1,2,3,3,3} #사전은 중괄호에 키,밸류
# python = set(["유재석", "박명수"])
# print(java.union(python))
# print(java.difference(python))
# python.add("김태호")
# java.remove("김태호")

# menu = {"커피", "우유", "주스"}
# print(menu,type(menu))

# menu = list(menu)
# print(menu,type(menu))

# menu = tuple(menu)
# print(menu,type(menu))
# print("{0:^<+30,}".format(100000000000))
# lines = score_file.readlines()#리스트형태로저장
# with open("profile.pickle","rb") as profile_file :
# with open(str(i)+"주차.txt", "w", encoding="utf8") as report_file :
# def __init__(self,name,hp,damage):
# if wraith2.clocking == True :
# def attack(self, location) :
# super().__init__(name, hp, 0) #셀프없음
# super().__init__() #슈퍼를 쓰면 다중상속시 첫번째꺼만 슈퍼로 받아옴
# raise ValueError
# finally : 에러가 나도 실행함!
# from theater_module import price_solider as ps
# import travel.thailand 모듈이나 패키지만 임포트가능 함수는 바로할수없음
# from travel.thailand import ThailandPackage 프롬->임포트 하면 함수가능
# __all__ = ["vietnam", "thailand"]
# if __name__ == "__main__":
# print("우리가 만난지 100일은", today +td) #오늘부터100일후 
# # print(glob.glob("*.py")) 
# # print(dir(lst))
# for -else 를 통한 2중 브레이크 트릭 가능