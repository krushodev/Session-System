interface IUserFileRepository {
    list: () => Promise<[]>;
    findOne: (id: string) => Promise<{}>;
    saveOne: (data: object) => Promise<{}>;
    removeOne: (id: string) => Promise<boolean>;
}

export default IUserFileRepository;