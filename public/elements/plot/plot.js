import { Element } from '../element';
import './flot';
import './plot.less';
import { size } from './plugins/size';
import header from './header.png';
import { debounce, includes } from 'lodash';



module.exports = new Element('plot', {
  displayName: 'Coordinate plot',
  description: 'An customizable XY plot for making line, bar or dot charts from your data',
  image: header,
  expression: 'demodata().pointseries(x="time", y="sum(price)", color="state").plot(defaultStyle=seriesStyle(lines=2)).render()',
  render(domNode, config, done, events) {
    const $ = window.$;

    // TODO: OH NOES
    if (!includes($.plot.plugins, size)) $.plot.plugins.push(size);

    config.options.legend.labelBoxBorderColor = 'transparent';
    const plot = $.plot($(domNode), config.data, config.options);

    function resize() {
      plot.resize();
      plot.setupGrid();
      plot.draw();
    }

    function destroy() {
      plot.shutdown();
    }

    events.on('destroy', destroy);
    events.on('resize', debounce(resize, 40, { maxWait: 40 })); // 1000 / 40 = 25fps

    return done(plot);
  },
});
