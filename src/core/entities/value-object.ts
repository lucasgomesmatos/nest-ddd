export abstract class ValueObject<T> {
  protected props: T

  protected constructor(props: T) {
    this.props = props
  }

  public equals(valueObject: ValueObject<T>) {
    if (valueObject === null || valueObject === undefined) {
      return false
    }

    if (valueObject.props === undefined) {
      return false
    }

    return JSON.stringify(this.props) === JSON.stringify(valueObject.props)
  }
}
