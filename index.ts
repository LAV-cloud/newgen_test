// type IPrice = number | null
// type IPrices = IPrice[]

interface ICourse {
    name: string;
    prices: (number | null)[];
}

// Список курсов
const courses: ICourse[] = [
    { name: 'Courses in England', prices: [0, 100] },
    { name: 'Courses in Germany', prices: [500, null] },
    { name: 'Courses in Italy', prices: [100, 200] },
    { name: 'Courses in Russia', prices: [null, 400] },
    { name: 'Courses in China', prices: [50, 250] },
    { name: 'Courses in USA', prices: [200, null] },
    { name: 'Courses in Kazakhstan', prices: [56, 324] },
    { name: 'Courses in France', prices: [null, null] },
];

// Варианты цен (фильтры), которые ищет пользователь
const requiredRange1: (number | null)[] = [null, 200];
const requiredRange2: (number | null)[] = [100, 350];
const requiredRange3: (number | null)[] = [200, null];

function priceFilter(
    range: readonly (number | null)[],
    courses: readonly ICourse[]
): ICourse[] {
    const [rangeFrom, rangeTo] = range;

    //* THROW ERROR
    if (rangeFrom && rangeTo && rangeFrom > rangeTo)
        throw new Error('Incorrect rangeFrom');

    const filteredCourses: ICourse[] = courses.filter((course: ICourse) => {
        const [from, to] = course.prices;

        //* Can add throw error when course have incorrect range

        if (!from && !to) return course;

        if (from !== null && rangeFrom !== null && rangeFrom <= from) {
            if (
                (to !== null &&
                    rangeTo !== null &&
                    from < to &&
                    rangeTo >= to) ||
                rangeTo === null
            )
                return course;
        } else if (rangeFrom == null || (from == null && rangeFrom)) {
            if (
                (to !== null && rangeTo !== null && rangeTo >= to) ||
                rangeTo === null
            )
                return course;
        }
    });
    return filteredCourses;
}

const filter1 = priceFilter(requiredRange1, courses);
console.log(filter1);

const filter2 = priceFilter(requiredRange2, courses);
console.log(filter2);

const filter3 = priceFilter(requiredRange3, courses);
console.log(filter3);
