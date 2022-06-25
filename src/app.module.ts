import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules';
import { DataSource } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './modules/users/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import {
  BanCase,
  EmailChangeCase,
  PasswordChangeCase,
  StatusChangeCase,
  UsernameChangeCase,
} from './modules/users/entities/reference';
import { SessionRefreshToken } from './modules/auth/entities/session-refresh-tokens.entity';
import { InstitutionsModule } from './modules/institutions/institutions.module';
import { AttendeesModule } from './modules/attendees/attendees.module';
import { SecurityModule } from './modules/security/security.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { VisitsModule } from './modules/visits/visits.module';
import { StudentsModule } from './modules/students/students.module';
import { ManagersModule } from './modules/managers/managers.module';
import { EventsModule } from './modules/events/events.module';
import { FaceRecognitionModule } from './modules/face-recognition/face-recognition.module';
import { S3Module } from './modules/s3/s3.module';
import * as fs from 'fs';
import { Attendee } from './entities/attendee.entity';
import { BirthCertificate } from './entities/birth-certificate.entity';
import { DriverLicense } from './entities/driver-license.entity';
import { Event } from './entities/event.entity';
import { Institution } from './entities/institution.entity';
import { ManagerProfile } from './entities/manager-profile.entity';
import { Passport } from './entities/passport.entity';
import { Profile } from './entities/profile.entity';
import { SecurityProfile } from './entities/security-profile.entity';
import { Student } from './entities/student.entity';
import { Visit } from './entities/visit.entity';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { PassportModule } from './modules/passports/passport.module';
import { DriverLicenseModule } from './modules/driver-licenses/driver-license.module';
import { BirthCertificateModule } from './modules/birth-certificates/birth-certificate.module';
import { Incident } from './entities/incident.entity';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        User,
        BanCase,
        StatusChangeCase,
        EmailChangeCase,
        PasswordChangeCase,
        UsernameChangeCase,
        SessionRefreshToken,
        Attendee,
        BirthCertificate,
        DriverLicense,
        Event,
        Institution,
        ManagerProfile,
        Passport,
        Profile,
        SecurityProfile,
        Student,
        Visit,
        Incident,
      ],
      synchronize: true,
      dropSchema: true,
      ssl: {
        rejectUnauthorized: false,
        cert: fs.readFileSync(process.env.SSL_CERT).toString(),
      },
    }),
    ThrottlerModule.forRoot({}),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    InstitutionsModule,
    AttendeesModule,
    SecurityModule,
    IncidentsModule,
    VisitsModule,
    StudentsModule,
    ManagersModule,
    EventsModule,
    FaceRecognitionModule,
    S3Module,
    ProfilesModule,
    PassportModule,
    DriverLicenseModule,
    BirthCertificateModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
