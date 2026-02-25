export interface Criteria {
  id: number; // add id for key
  title: string;
  description: string;
  photoUrl: string;
}

export const criteriaList: Criteria[] = [
  {
    id: 1,
    title: "Профессионализм",
    description:
      "Оцените уровень профессиональных знаний и навыков преподавателя.",
    photoUrl: "/criteria.jpg",
  },
  {
    id: 2,
    title: "Коммуникабельность",
    description:
      "Способность ясно и доступно объяснять материал, общаться со студентами.",
    photoUrl: "/criteria.jpg",
  },
  {
    id: 3,
    title: "Доброжелательность",
    description:
      "Отношение к студентам, готовность помочь, создать комфортную атмосферу.",
    photoUrl: "/criteria.jpg",
  },
  {
    id: 4,
    title: "Требовательность",
    description:
      "Справедливая требовательность в оценке знаний и выполнении заданий.",
    photoUrl: "/criteria.jpg",
  },
  {
    id: 5,
    title: "Интерес к предмету",
    description:
      "Умение заинтересовать студентов, показать практическую значимость.",
    photoUrl: "/criteria.jpg",
  },
  {
    id: 6,
    title: "Организованность",
    description:
      "Четкая структура занятий, соблюдение сроков, наличие материалов.",
    photoUrl: "/criteria.jpg",
  },
  {
    id: 7,
    title: "Объективность",
    description: "Беспристрастность в оценке, отсутствие предвзятости.",
    photoUrl: "/criteria.jpg",
  },
  {
    id: 8,
    title: "Современность",
    description: "Использование современных методик и технологий в обучении.",
    photoUrl:
      "https://via.placeholder.com/150/808000/FFFFFF?text=Современность",
  },
  {
    id: 9,
    title: "Доступность",
    description: "Доступность для вопросов вне занятий, консультации.",
    photoUrl: "/criteria.jpg",
  },
];
