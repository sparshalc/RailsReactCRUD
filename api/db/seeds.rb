Post.delete_all

25.times do |x|
    Post.create!(
        title: Faker::Lorem.sentence(word_count: 3),
        body: Faker::Lorem.paragraph(sentence_count: 3)    )
end