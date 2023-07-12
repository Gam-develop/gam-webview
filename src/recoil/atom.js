import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const magazineDetailState = atom({
  key: 'magazineDetail',
  default: {
    magazineIntro: '',
    magazinePhotos: ['asdfdsaf', 'dasf', 'adsf'],
    questions: [
      {
        questionId: 1,
        questionOrder: 1,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionId: 2,
        questionOrder: 2,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionId: 3,
        questionOrder: 3,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionId: 4,
        questionOrder: 4,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
    ],
  },
  effects_UNSTABLE: [persistAtom],
});
