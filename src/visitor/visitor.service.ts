import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DEVICE_INFO_REPOSITORY, IP_INFO_REPOSITORY, VISITOR_REPOSITORY } from './visitor.contracts';
import { Visitor } from './entities/visitor.entity';
import { DeviceInfo } from './entities/device-info.entity';
import { IPInfo } from './entities/ip-info.entity';
import { HttpService } from '@nestjs/axios';
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
    private readonly httpService: HttpService,
  ) { }

  async createVisitor(deviceInfoData: CreateDeviceInfoDto, ipAddress: string): Promise<Visitor> {
    const deviceInfo = this.deviceInfoRepository.create(deviceInfoData);
    await this.deviceInfoRepository.save(deviceInfo);

    const ipInfoData = await this.getIPInfo(ipAddress);
    const ipInfo = this.ipInfoRepository.create(ipInfoData);
    await this.ipInfoRepository.save(ipInfo);

    const visitor = new Visitor();
    visitor.deviceInfo = deviceInfo;
    visitor.ipInfo = ipInfo;

    return this.visitorRepository.save(visitor);
  }

  async getIPInfo(ipAddress: string): Promise<CreateIPInfoDto> {
    const response = await this.httpService.get(`https://api.ipapi.com/${ipAddress}?access_key=YOUR_ACCESS_KEY`).toPromise();
    const { country_name, country_code, region_name, city, latitude, longitude, isp, org } = response.data;
    return {
      ipAddress,
      country: country_name,
      countryCode: country_code,
      region: region_name,
      city,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      isp,
      org,
    };
  }

  async findVisitorById(id: string): Promise<Visitor> {
    return this.visitorRepository.findOne({ where: { id } });
  }

  async getIpAddress(): Promise<string> {
    const response = await this.httpService.get('https://api.ipify.org?format=json').toPromise();
    return response.data.ip;
  }
}
