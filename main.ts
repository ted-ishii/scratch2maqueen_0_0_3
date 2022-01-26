function joinBools (ledLeft: number, ledRight: number, patrolLeft: number, patrolRight: number) {
    slot3Value = ledLeft * 8 + ledRight * 4 + patrolLeft * 2 + patrolRight
}
ScratchMore.startService(function () {
	
})
function splitToBools (value: number) {
    ledLeft = Math.floor(value / 8)
    ledRight = Math.floor((value - ledLeft * 8) / 4)
    patrolLeft = Math.floor((value - ledLeft * 8 - ledRight * 4) / 2)
    patrolRight = value - ledLeft * 8 - ledRight * 4 - patrolLeft * 2
}
let patrolRight = 0
let patrolLeft = 0
let ledRight = 0
let ledLeft = 0
let slot3Value = 0
basic.showString("scratch2maqueen ")
pins.analogWritePin(AnalogPin.P0, 0)
basic.forever(function () {
    if (ScratchMore.getSlot(Slot.SLOT0) >= 0) {
        maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, ScratchMore.getSlot(Slot.SLOT0))
    } else {
        maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, -1 * ScratchMore.getSlot(Slot.SLOT0))
    }
    if (ScratchMore.getSlot(Slot.SLOT1) >= 0) {
        maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, ScratchMore.getSlot(Slot.SLOT1))
    } else {
        maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, -1 * ScratchMore.getSlot(Slot.SLOT1))
    }
    ScratchMore.setSlot(Slot.SLOT2, maqueen.sensor(PingUnit.Centimeters))
    slot3Value = ScratchMore.getSlot(Slot.SLOT3)
    splitToBools(slot3Value)
    if (ledLeft == 1) {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
    } else {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    }
    if (ledRight == 1) {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
    } else {
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
    }
    patrolLeft = maqueen.readPatrol(maqueen.Patrol.PatrolLeft)
    patrolRight = maqueen.readPatrol(maqueen.Patrol.PatrolRight)
    joinBools(ledLeft, ledRight, patrolLeft, patrolRight)
    ScratchMore.setSlot(Slot.SLOT3, slot3Value)
})
