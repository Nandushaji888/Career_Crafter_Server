export interface Dependencies {
    useCase: UseCase
    repository: Repository
    consumeUsecase: ConsumeUsecase
  }
  
  export interface UseCase {
    createPost_useCase: Function
    findJobDetailsuseCase: Function
    pending_post_count_usecase: Function
    poststatus_change_usecase: Function
    get_All_Posts_useCase: Function
    recruiter_list_jobs: Function
    get_all_posts_usecase: Function
  }
  
  export interface Repository {
    postRepository: PostRepository
  }
  
  export interface PostRepository {
    storeUser: Function
    createPost: Function
    findJobPost: Function
    pendingPost: Function
    getAllPostsAdmin: Function
    changeStatus: Function
    listJobs: Function
    recruiterListJobs: Function
  }
  
  export interface ConsumeUsecase {
    createUserUsecase: Function
  }
  