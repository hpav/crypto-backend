import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { WalletService } from './wallet.service';
import { WalletAddInput } from './wallet.input';

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

  @Post('wallet/add')
  async walletAdd(@Req() req: Request, @Res() res: Response) {
    const walletAddInput: WalletAddInput = req.body;
    const { address, connectionIds } = walletAddInput;

    if (!address || !Array.isArray(connectionIds) || !connectionIds.length) {
      return res.sendStatus(400);
    }

    if (!connectionIds.every((item: string) => typeof item === 'string')) {
      return res.sendStatus(400);
    }

    await this.walletService.addWallet(walletAddInput);

    return res.sendStatus(200);
  }
}
