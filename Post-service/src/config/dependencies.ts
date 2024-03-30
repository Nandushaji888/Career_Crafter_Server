import { postRepository } from "../libs/app/repository";

import {
createPost_useCase,
findJobDetailsuseCase,
pending_post_count_usecase,
poststatus_change_usecase,
get_All_Posts_useCase,
recruiter_list_jobs,
createUserUsecase,
get_all_posts_usecase
} from "../libs/usecase";

const useCase: any = {
createPost_useCase,
findJobDetailsuseCase,
pending_post_count_usecase,
poststatus_change_usecase,
get_All_Posts_useCase,
recruiter_list_jobs,
get_all_posts_usecase
};
const repository: any = {
  postRepository,
};

const consumeUsecase: any = {
  createUserUsecase,

};

export default {
  useCase,
  repository,
  consumeUsecase
};
