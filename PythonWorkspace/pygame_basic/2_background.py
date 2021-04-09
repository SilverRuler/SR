import pygame

pygame.init() # must

# 화면 크기
screen_width = 480
screen_height = 640
screen = pygame.display.set_mode((screen_width, screen_height))

# 화면 타이틀
pygame.display.set_caption("Silver Game")

# 배경이미지 로드
background = pygame.image.load("C:/Users/master1/Desktop/PythonWorkspace/pygame_basic/background.png")

# event loop

running = True # 게임 진행중

while running : 
    for event in pygame.event.get(): # 어떤 이벤트가 발생하였는가
        if event.type == pygame.QUIT : #창 x표시
            running = False 
    
    #screen.fill((0,0,200))
    screen.blit(background,(0,0)) # 배경 그리기
    
    pygame.display.update() # 게임 화면을 다시 그리기

# pygame 종료 처리
pygame.quit()