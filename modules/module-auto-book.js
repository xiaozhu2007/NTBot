const pages = ["第1页", "第2页", "第3页", "第4页"].map((page) =>
    page
        .split(" ")
        .map(
            (word, i) => `§${((i % 13) + 1).toString(16)}${i % 2 ? "§l" : ""}${word}`
        )
        .join(" ")
)

bot.on("chat", (username, message) => {
    if (username === bot.username) return
    switch (message) {
    case "print":
        print() //打印书本内容
        break
    case "write":
        write() //写入
        break
    case "toss":
        toss()
        break
    }
})

function toss() {
    const [book] = bot.inventory
        .items()
        .filter(({ name }) => name === "writable_book")
    bot.tossStack(book)
}

async function write() {
    const [book] = bot.inventory
        .items()
        .filter(({ name }) => name === "writable_book")
    if (!book) {
        bot.safechat("I don't have a book.")
        return
    }
    await bot.writeBook(book.slot, pages)
    print()
}

function print() {
    const [book] = bot.inventory
        .items()
        .filter(({ name }) => name === "writable_book")
    book.nbt.value.pages.value.value.forEach((page, i) =>
        bot.safechat(`Page ${i + 1}: ${page.replace(/§[a-z0-9]/g, "")}`)
    )
}
