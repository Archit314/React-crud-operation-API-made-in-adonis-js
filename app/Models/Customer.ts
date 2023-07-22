import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number


  @column({columnName: 'name'})
  public name: string

  @column({columnName: 'number'})
  public number: string

  @column({columnName: 'email'})
  public email: string

  @column({columnName: 'address'})
  public address: string

  @column({columnName: 'city'})
  public city: string

  @column({columnName: 'state'})
  public state: string

  @column({columnName: 'country'})
  public country: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
