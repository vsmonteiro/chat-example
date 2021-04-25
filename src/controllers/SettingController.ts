import { Request, Response } from 'express';
import { SettingService } from "../services/SettingService";

class SettingController {
  async create( req: Request, res: Response ) {
    const settingService = new SettingService();

    try {
      return res.json(await settingService.create(req.body)); 
    } catch (error) {
      return res.status(400).json({
        message: error.message
      })
    }
  }

  async findByUsername(req: Request, res: Response){
    const { username } = req.params;
    const settingsService = new SettingService();
    const settings = await settingsService.findByUsername(username);
    return res.json(settings);
  }

  async update(req: Request, res: Response) {
    const { username } = req.params;
    const { chat } = req.body;
    const settingsService = new SettingService();
    const settings = await settingsService.update(username, chat);
    return res.json(settings);
  }
}

export default new SettingController();