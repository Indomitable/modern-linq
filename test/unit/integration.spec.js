import { expect } from 'chai';
import {fromIterable, range} from "../../src";

describe('integration tests', () => {
    it('should be able to do paging with skip and take', () => {
        const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const pageSize = 3;
        let pageCount = input.length / pageSize;
        pageCount = pageCount - Math.floor(pageCount) === 0 ? Math.floor(pageCount) + 1 : pageCount;
        const pages = [];
        for (let i = 0; i < pageCount; i++) {
            pages.push(
                fromIterable(input)
                    .skip(i * pageSize)
                    .take(pageSize)
                    .toArray()
            );
        }
        expect(pages).to.deep.equal([
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [9, 10],
        ]);
    });

    it('should evaluate when requested', () => {
        const array = range(0, 30).toArray();
        const query = fromIterable(array)
            .select(i => i * 3)
            .where(i => i > 10)
            .select(i =>
                ({
                    odd: i % 2 === 1,
                    even: i % 2 === 0,
                    num: i
                })
            )
            .skip(1)
            .take(4)
            .groupBy(i => i.odd);
            //.single();
        for (const i of query) {
            // console.log(JSON.stringify(i));
        }
        for (const i of query) {
            // console.log(JSON.stringify(i));
        }
    });
});
