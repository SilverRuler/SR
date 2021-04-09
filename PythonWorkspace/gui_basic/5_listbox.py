from tkinter import *

root = Tk()
root.title("Silver GUI")
root.geometry("640x480") # 크기

listbox = Listbox(root, selectmode = "extended", height = 0) 
#익스텐드, 여러개선택가능 0은 다보여주고 3은 3개치만큼 보여줌
listbox.insert(0, "사과")
listbox.insert(1, "딸기")
listbox.insert(2, "바나나")
listbox.insert(END, "수박")
listbox.insert(END, "포도")
listbox.pack()

def btncmd():
   # 삭제
   # listbox.delete(0)  # 0 맨앞, END 맨뒤
   
   # 개수 확인
   # print("리스트에는 ",listbox.size(),"개가 있어요")
   
   # 항목 확인 시작 idx, 끝 idx 
   # print("1번째 부터 3번째 까지의 항목 : ", listbox.get(0,2))

   # 선택 항목 확인 위치로 반환
    print("선택된 항목 : ",listbox.curselection())

    


btn = Button(root, text = "클릭", command = btncmd)
btn.pack()

root.mainloop()