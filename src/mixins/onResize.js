import onEvent from './onEvent';

export default function onResize(cb) {
  return onEvent('resize', cb);
}
