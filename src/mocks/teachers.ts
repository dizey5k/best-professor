export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  position: string;
}

export const teachers: Teacher[] = [
  {
    id: 1,
    firstName: "Иван",
    lastName: "Иванов",
    patronymic: "Иванович",
    position: "Профессор",
  },
  {
    id: 2,
    firstName: "Петр",
    lastName: "Петров",
    patronymic: "Петрович",
    position: "Доцент",
  },
  {
    id: 3,
    firstName: "Сидор",
    lastName: "Сидоров",
    patronymic: "Сидорович",
    position: "Старший преподаватель",
  },
  {
    id: 4,
    firstName: "Анна",
    lastName: "Аннова",
    patronymic: "Анновна",
    position: "Кандидат наук",
  },
  {
    id: 5,
    firstName: "Елена",
    lastName: "Еленова",
    patronymic: "Еленовна",
    position: "Доцент",
  },
];
