export class ActionControl {
  timeout = 0;

  fn: any = null;

  wait = 0;

  preActionTime = 0;

  constructor(fn: any, wait: number) {
    this.fn = fn;

    this.wait = wait;
  }

  debounce(): void {
    if (this.timeout !== 0) clearTimeout(this.timeout); //清除这个定时器
    this.timeout = setTimeout(this.fn, this.wait);
  }

  throttle(): void {
    if (this.preActionTime === 0) this.preActionTime = new Date().getTime();

    const timeBetween = new Date().getTime() - this.preActionTime;

    console.log(timeBetween);

    if (timeBetween >= this.wait) {
      this.timeout = setTimeout(() => {
        this.fn();

        this.preActionTime = 0;
      }, this.wait);
    }
  }
}
