test('test constructor', () => {
    const user: User = new User({name: 'vic'});
    expect(user.name).toEqual('vic');
})