import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  beforeUpdate(event: UpdateEvent<User>) {
    const statusUpdated = event.updatedColumns.find(
      (column) => column.propertyName,
      User.prototype.password,
    );

    if (statusUpdated) {
      if (event.databaseEntity.password !== event.entity.password) {
        event.manager
          .getRepository(User)
          .update(
            { id: event.entity.id },
            {
              passwordUpdatedAt: new Date(),
            },
          )
          .then((r) => r);
      }
    }
  }
}
