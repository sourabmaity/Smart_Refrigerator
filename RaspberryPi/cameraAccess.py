import time
import cv2

from picamera2 import Picamera2, Preview

picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration(main={"format": 'XRGB8888', "size": (640, 480)}))


picam2.start()
time.sleep(2)
while True:
    img=picam2.capture_array()
    cv2.imshow("Frame",img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
picam2.close()
cv2.destroyAllWindows()