import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { magazineDetail, magazineDetailResult, magazineListData } from '../types/magazine';

const { persistAtom } = recoilPersist();

export const magazineDetailState = atom<magazineDetail>({
  key: 'magazineDetail',
  default: {
    magazineIntro: '',
    magazinePhotos: ['', '', '', ''],
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

export const magazineListState = atom<magazineListData[]>({
  key: 'magazineList',
  default: [
    {
      magazineId: 1,
      magazineTitle: '',
      interviewee: '',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export const magazineResultState = atom<magazineDetailResult>({
  key: 'magazineDetailResult',
  default: {
    // magazineId: 1,
    title: '',
    interviewPerson: '',
    magazineIntro: '',
    magazinePhotos: ['', '', '', ''],
    questions: [
      {
        questionOrder: 1,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionOrder: 2,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
        questionOrder: 3,
        question: '',
        answer: '',
        answerImage: '',
        imageCaption: '',
      },
      {
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
