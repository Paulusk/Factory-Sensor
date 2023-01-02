// @ts-check

export class ArgumentError extends Error {}

export class OverheatingError extends Error {
  constructor(temperature) {
    super(`The temperature is ${temperature} ! Overheating !`);
    this.temperature = temperature;
  }
}

/**
  Check if the humidity level is not too high.
*/
export function checkHumidityLevel(humidityPercentage) {
  if (humidityPercentage > 70) throw new Error("too  much humidity!!") 
}

/**
  Check if the temperature is not too high.
 */
export function reportOverheating(temperature) {
  if(!temperature) throw new ArgumentError("sensor broken")
  if(temperature > 500) throw new OverheatingError(temperature)
}

/**
  Triggers the needed action depending on the result of the machine check.
 */
export function monitorTheMachine(actions) {
  try {
    actions.check()
  } catch (error) {
    if (error instanceof ArgumentError) {
      actions.alertDeadSensor()
    }
   else if (error instanceof OverheatingError) {
      error.temperature < 600 ? actions.alertOverheating() : actions.shutdown()
    }
    else {throw error}
  }
  
}
