 
import dlib
import cv2

detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor("models/Vidyut.pth")

def detect_landmarks(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)

    landmarks_list = []

    for face in faces:
        landmarks = predictor(gray, face)
        points = [(p.x, p.y) for p in landmarks.parts()]
        landmarks_list.append(points)

        for (x, y) in points:
            cv2.circle(image, (x, y), 1, (0, 255, 0), -1)

    result_path = image_path.replace(".", "_landmarks.")
    cv2.imwrite(result_path, image)

    return {"landmarks": landmarks_list, "result_image": result_path}
