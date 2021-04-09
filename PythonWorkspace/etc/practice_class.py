class Unit:
    def __init__(self):
        print("Unit 생성자")
    
class Flyable:
    def __init__(self):
        print("Flyable 생성자")

class FlyableUnit(Flyable, Unit):
    def __init__(self):
        #super().__init__() #슈퍼를 쓰면 다중상속시 첫번째꺼만 슈퍼로 받아옴
        Unit.__init__(self)
        Flyable.__init__(self)


dropship = FlyableUnit()