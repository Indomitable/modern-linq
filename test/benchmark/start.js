import { from } from '../../index.esm';
import * as benchmarks from './export';

import Benchmark from 'benchmark';

const suit = new Benchmark.Suite('modern-linq bechrmark tests');

const suitParamIndex = process.argv.indexOf('--suit');
let suitName = '';
if (suitParamIndex > -1) {
    suitName = process.argv[suitParamIndex + 1];
}

const regEx = new RegExp('^\\[(.+)]\\s(.+)$');
const keys = Object.keys(benchmarks);
keys.forEach(k => {
    const bench = benchmarks[k];
    const benchSuit = regEx.exec(bench.name)[1];
    if (!suitName || benchSuit === suitName) {
        suit.add(bench.name, bench.fn);
    }
});

suit.on('complete', function () {
    const formatNumber = (num) => {
        if (num.indexOf('.') > -1 || num.length < 4) {
            return num;
        }
        return from(num).reverse().page(3)
            .where(_ => _)
            .groupBy((arr, i) => i, _ => _.reverse().join(''), (key, items) => items.first())
            .reverse()
            .join(',');
    };

    const benchFormat = (bench, showError) => {
        if (showError) {
            return `${bench.name} (${formatNumber(bench.ops)} op/sec) error margin: \xb1${bench.error.toFixed(2)}%`;
        } else {
            return `${bench.name} (${formatNumber(bench.ops)} op/sec)`;
        }
    };

    const getBenchData = (_) => {
        return {
            name: _.name,
            ops: _.bench.hz.toFixed(_.bench.hz < 100 ? 2 : 0),
            error: _.bench.stats.rme
        };
    };

    const benchCategories = from(this)
        .select(b => {
            const match = regEx.exec(b.name);
            return {
                category: match[1],
                name: match[2],
                bench: b
            }
        })
        .groupBy(_ => _.category, _ => _, (key, items) => {
            const fastestBench = items.max((a, b) => a.bench.hz - b.bench.hz);
            return {
                name: key,
                fastest: getBenchData(fastestBench),
                benches: items.orderByDescending(_ => _.bench.hz).select(getBenchData)
            }
        });

    for (const category of benchCategories) {
        console.log(`\n${category.name} benchmark: Fastest method: ${benchFormat(category.fastest)}`);
        for (const bench of category.benches) {
            const slower = (category.fastest.ops / bench.ops).toFixed(2);
            console.log(`\t${benchFormat(bench, true)}, slower: ${slower} times`);
        }
    }
    console.log('\n');
})
    .run({async: true});
