export default {
  bind(el, binding, vnode) {
    let current = 0;

    el.addEventListener('dblclick', () => {
      current = getRotateValue(binding, current);

      let effect = getEffect(binding, current);

      el.style.transform = effect;

      if (binding.modifiers.animate) {
        el.style.transition = 'transform 0.5s';
      }
    });
  },
};

function getRotateValue(binding, current) {
  if (binding.modifiers.reverse) {
    return current -= binding.value || 90;
  }

  return current += binding.value || 90;
}

function getEffect(binding, current) {
  if (binding.arg == 'scale') {
    let scale = binding.value || 1.2;

    return `scale(${scale})`;
  }

  return `rotate(${current}deg)`;
}
