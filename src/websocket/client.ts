import { io } from "../http";
import { ConnectionService } from "../services/ConnectionService";
import { MessageService } from "../services/MessageService";
import { UserService } from "../services/UserService";

interface IParams {
  text: string;
  email: string;
}

io.on("connect", (socket) => {
  const connectionService = new ConnectionService();
  const userService = new UserService();
  const messageService = new MessageService();

  socket.on("client_first_access", async (params: IParams) => {
    const { text, email } = params;

    const { id: user_id } = await userService.create(email);
    const connection = await connectionService.findByUser(user_id);

    if (!connection) {
      await connectionService.create({
        socket_id: socket.id,
        user_id,
      });
    } else {
      connection.socket_id = socket.id;
      await connectionService.create(connection);
    }

    await messageService.create({
      text,
      user_id,
    });

    const allMessages = await messageService.listByUser(user_id);

    socket.emit("client_list_all_message", allMessages);
    const allUsers = await connectionService.findAllWithoutAdmin();
    io.emit('admin_list_all_users', allUsers)
  });

  socket.on("client_send_to_admin", async (params) => {
    const { socket_admin_id, text } = params;
    const socket_id = socket.id;
    const { user_id } = await connectionService.findBySocket(socket_id);
    const message = await messageService.create({
      text,
      user_id,
    });

    io.to(socket_admin_id).emit("admin_receive_message", {
      message,
      socket_id,
    });
  });
});
