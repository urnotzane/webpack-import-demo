import { intro } from './intro';

intro();

const iButton = () => {
  const button = document.createElement('button');
  const buttonText = document.createTextNode('click me');
  button.appendChild(buttonText);
  button.onclick = () => {
    import('./print')
      .then((print) => print.default());
  }
  return button;
}

document.body.appendChild(iButton());