import { Request, Response } from 'express';
import { UserService } from "../services/UserService";

class UserController {
  async create(req: Request, res: Response) {
    const { email } = req.body;
    const userService = new UserService();
    return res.json(await userService.create(email));
  }
}

export default new UserController();