import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { WalletService } from './wallet.service';

@Controller()
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get('wallet/overview/:address')
  async walletOverview(
    @Param('address') address: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const chainsWithCoins = await this.walletService.getOverview(address);

    res.status(200).json(chainsWithCoins);
  }
}
