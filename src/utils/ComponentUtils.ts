export function showLoadingCircle(): void {
  const circle = document.getElementById('app-loading-circle');

  if(circle) {
    circle.className = 'prepare';

    setTimeout(() => {
      circle.className = 'show';
    }, 50);
  }
}


export function hideLoadingCircle(): void {
  const circle = document.getElementById('app-loading-circle');

  if(circle) {
    circle.className = 'prepare';

    setTimeout(() => {
      circle.className = '';
    }, 500);
  }
}
