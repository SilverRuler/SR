import pygame
#####################################################################################
# 기본 초기화
pygame.init() # must

# 화면 크기
screen_width = 480
screen_height = 640
screen = pygame.display.set_mode((screen_width, screen_height))

# 화면 타이틀
pygame.display.set_caption("Silver Game")

# FPS
clock = pygame.time.Clock()
#####################################################################################
# 1. 사용자 게임 초기화 ( 배경화면, 게임 이미지, 좌표, 폰트,속도)


running = True 
while running : 
    dt = clock.tick(30) 

    # 2. 이벤트 처리 (키보드 마우스 등)
    for event in pygame.event.get(): 
        if event.type == pygame.QUIT :
            running = False 
        
       
    # 3. 게임 캐릭터 위치 정의

    # 경곗값 처리
    

    # 4.충돌 처리

    # 충돌 체크
    

    # 5. 화면에 그리기
    pygame.display.update() # 게임 화면을 다시 그리기



pygame.quit()
