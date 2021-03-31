export class CounterService {
    inactivations: number = 0;
    activations: number = 0;

    logInactivation() {
        this.inactivations++
    }
    logActivation() {
        this.activations++;
    }
}