import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DEVICE_INFO_REPOSITORY, IP_INFO_REPOSITORY, VISITOR_REPOSITORY } from './visitor.contracts';
import { Visitor } from './entities/visitor.entity';
import { DeviceInfo } from './entities/device-info.entity';
import { IPInfo } from './entities/ip-info.entity';
import { CreateDeviceInfoDto } from './dto/create-device-info.dto';
import { CreateIPInfoDto } from './dto/create-ip-info.dto';

@Injectable()
export class VisitorService {
  constructor(
    @Inject(VISITOR_REPOSITORY)
    private readonly visitorRepository: Repository<Visitor>,
    @Inject(DEVICE_INFO_REPOSITORY)
    private readonly deviceInfoRepository: Repository<DeviceInfo>,
    @Inject(IP_INFO_REPOSITORY)
    private readonly ipInfoRepository: Repository<IPInfo>,
  ) { }

  public async createVisitor(deviceInfoData: CreateDeviceInfoDto, ipAddress: string): Promise<{ visitorId: string }> {
    const deviceInfo = this.deviceInfoRepository.create(deviceInfoData);
    await this.deviceInfoRepository.save(deviceInfo);

    const ipInfoData = await this.getIPInfo(ipAddress);
    const ipInfo = this.ipInfoRepository.create(ipInfoData);
    await this.ipInfoRepository.save(ipInfo);

    const visitor = new Visitor();
    visitor.deviceInfo = deviceInfo;
    visitor.ipInfo = ipInfo;
    const newVisitor = await this.visitorRepository.save(visitor);
    return {
      visitorId: newVisitor.id
    }
  }

  public async getIPInfo(ipAddress: string): Promise<CreateIPInfoDto> {
    const response: {
      status,
      country,
      countryCode,
      region,
      regionName,
      city,
      zip,
      lat,
      lon,
      timezone,
      isp,
      org,
      as,
      query,
      district
    } = await fetch(`http://ip-api.com/json/${ipAddress}`).then(res => res.json()).then(res => res)

    const {
      country,
      countryCode,
      regionName,
      city,
      lat,
      lon,
      isp,
      org
    } = response;

    return {
      ipAddress,
      country: country,
      countryCode: countryCode,
      region: regionName,
      city,
      latitude: lat,
      longitude: lon,
      isp,
      org,
    };
  }

  public async findVisitorById(id: string): Promise<Visitor> {
    return this.visitorRepository.findOne({ where: { id } });
  }

  public async checkVisitor(id: string) {
    return Boolean(await this.findVisitorById(id))
  }

  public async setVisitorEmail(id: string, email: string) {
    const visitorEntity = await this.findVisitorById(id)
    if (!visitorEntity) {
      throw new NotFoundException("Visitor was not found!")
    }
    visitorEntity.email = email
    await this.visitorRepository.save(visitorEntity)
  }
}
