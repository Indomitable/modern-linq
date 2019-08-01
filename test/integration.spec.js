import { expect } from 'chai';
import { fromIterable } from "../src";

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
});
