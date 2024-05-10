import { faker } from "@faker-js/faker";
import My from "../utils/My";


export function getFakeRecommendedUsers(numUsers = 8) {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      username: faker.internet.userName(),
      photoSource: getRandomPhotoSource()
    });
  }
  return users;
}


export function getRandomPhotoSource() {  

  const photoSources = [
    "penguin.jpg", "penguin2.jpg", "penguin3.png", "mrbean.jpeg", "lady.png", "greenrobot.png", "boy1.png", "skull.png",
    "man2.jpg", "man3.jpg", "boy4.jpg", "pika.jpg", "panda.jpeg", "panda2.jpg", "girl5.jpg", "lady3.jpg", "dog2.jpeg",
    "pixel.gif", "hoodie1.png", "girl6.jpeg", "bear2.jpg", "dog3.jpg", "girl7.jpg", "bag1.jpeg", "luffy.jpeg", "cork.png"
  ];

  const randomNum = My.getRandomNumber(0, photoSources.length - 1);

  return photoSources[randomNum];
}


