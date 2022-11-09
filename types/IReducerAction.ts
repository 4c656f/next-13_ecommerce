export interface IReducerAction<ActionType extends string, Payload > {
    type: ActionType
    payload: Payload
}