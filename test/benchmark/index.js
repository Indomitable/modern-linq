import { from } from '../../index.esm';
import * as selectBenches from './select.perf'
import * as whereBenches from './where.perf'
import * as takeBenches from './take.perf'
import * as skipBenches from './skip.perf'
import * as sortBenches from './sort.perf'
import * as distinctBenches from './distinct.perf';

import Benchmark from 'benchmark';

const suit = new Benchmark.Suite('modern-linq bechrmark tests');

const requested = from(process.argv).where(a => a.startsWith('--')).join(',');
if (requested.length === 0) {
    from(selectBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    from(whereBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    from(takeBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    from(skipBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    from(sortBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    from(distinctBenches).forEach(e => suit.add(e.value.name, e.value.fn));
} else {
    if (requested.indexOf('--select') > -1) {
        from(selectBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    }
    if (requested.indexOf('--where') > -1) {
        from(whereBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    }
    if (requested.indexOf('--take') > -1) {
        from(takeBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    }
    if (requested.indexOf('--skip') > -1) {
        from(skipBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    }
    if (requested.indexOf('--sort') > -1) {
        from(sortBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    }
    if (requested.indexOf('--distinct') > -1) {
        from(distinctBenches).forEach(e => suit.add(e.value.name, e.value.fn));
    }
}

suit.on('complete', function () {
    const regEx = new RegExp('^\\[(.+)]\\s(.+)$');
    const formatNumber = (num) => {
        return from(num.toString()).reverse().page(3)
            .groupBy((arr, i) => i, _ => _.reverse().join(''), (key, items) => items.first())
            .reverse()
            .join(',');
    };

    const benchFormat = (bench, showError) => {
        if (showError) {
            return `${bench.name} (${formatNumber(bench.ops)}, ${bench.ops} op/sec) error margin: \xb1${bench.error.toFixed(2)}%`;
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
