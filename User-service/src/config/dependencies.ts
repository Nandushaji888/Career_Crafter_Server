import { postRepository, userRepository } from "../libs/app/repository";
import {
  updateUser_useCase,
  createPostUseCase,
  createUserUsecase,
  get_userData_useCase,
  get_all_users_usecase,
  change_userStatus_useCase,
  addAppliedJob_usecase,
  save_job_post_usecase,
  applied_job_list_usecase,
  saved_job_list_usecase,
} from "../libs/usecase";

const useCase: any = {
  updateUser_useCase,
  get_userData_useCase,
  get_all_users_usecase,
  change_userStatus_useCase,
  save_job_post_usecase,
  applied_job_list_usecase,
  saved_job_list_usecase,
};

const repository: any = {
  userRepository,
  postRepository,
};

const consumeUsecase: any = {
  createUserUsecase,
  createPostUseCase,
  addAppliedJob_usecase,
};

export default {
  repository,
  useCase,
  consumeUsecase,
};
